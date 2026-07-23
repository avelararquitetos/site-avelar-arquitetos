import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Upload, ArrowLeft, Star, GripVertical, LogOut } from "lucide-react";
import { toast } from "sonner";

type Project = {
  id: string;
  title: string;
  location: string | null;
  category: string | null;
  description: string | null;
  area: string | null;
  year: string | null;
  display_order: number;
};

type ProjectImage = {
  id: string;
  project_id: string;
  image_url: string;
  is_cover: boolean;
  display_order: number;
};

const Admin = () => {
  const queryClient = useQueryClient();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "", location: "", category: "", description: "", area: "", year: ""
  });

  // Fetch projects
  const { data: projects = [] } = useQuery({
    queryKey: ["admin-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data as Project[];
    },
  });

  // Fetch images for selected project
  const { data: images = [] } = useQuery({
    queryKey: ["admin-project-images", selectedProject],
    queryFn: async () => {
      if (!selectedProject) return [];
      const { data, error } = await supabase
        .from("project_images")
        .select("*")
        .eq("project_id", selectedProject)
        .order("display_order");
      if (error) throw error;
      return data as ProjectImage[];
    },
    enabled: !!selectedProject,
  });

  // Create project
  const createProject = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("projects").insert({
        title: newProject.title,
        location: newProject.location || null,
        category: newProject.category || null,
        description: newProject.description || null,
        area: newProject.area || null,
        year: newProject.year || null,
        display_order: projects.length,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      setNewProject({ title: "", location: "", category: "", description: "", area: "", year: "" });
      setShowNewProject(false);
      toast.success("Projeto criado!");
    },
    onError: () => toast.error("Erro ao criar projeto"),
  });

  // Delete project
  const deleteProject = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      setSelectedProject(null);
      toast.success("Projeto removido!");
    },
  });

  // Upload image
  const uploadImage = useMutation({
    mutationFn: async (file: File) => {
      if (!selectedProject) throw new Error("Nenhum projeto selecionado");
      const fileExt = file.name.split(".").pop();
      const filePath = `${selectedProject}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("project-images")
        .getPublicUrl(filePath);

      const { error: insertError } = await supabase.from("project_images").insert({
        project_id: selectedProject,
        image_url: publicUrl,
        is_cover: images.length === 0,
        display_order: images.length,
      });
      if (insertError) throw insertError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-project-images", selectedProject] });
      toast.success("Imagem enviada!");
    },
    onError: () => toast.error("Erro ao enviar imagem"),
  });

  // Delete image
  const deleteImage = useMutation({
    mutationFn: async (image: ProjectImage) => {
      // Extract path from URL for storage deletion
      const url = new URL(image.image_url);
      const pathParts = url.pathname.split("/storage/v1/object/public/project-images/");
      if (pathParts[1]) {
        await supabase.storage.from("project-images").remove([pathParts[1]]);
      }
      const { error } = await supabase.from("project_images").delete().eq("id", image.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-project-images", selectedProject] });
      toast.success("Imagem removida!");
    },
  });

  // Set cover image
  const setCover = useMutation({
    mutationFn: async (imageId: string) => {
      if (!selectedProject) return;
      // Remove cover from all
      await supabase.from("project_images").update({ is_cover: false }).eq("project_id", selectedProject);
      // Set new cover
      const { error } = await supabase.from("project_images").update({ is_cover: true }).eq("id", imageId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-project-images", selectedProject] });
      toast.success("Capa atualizada!");
    },
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => uploadImage.mutate(file));
    e.target.value = "";
  };

  const currentProject = projects.find((p) => p.id === selectedProject);

  // Project detail view (images)
  if (selectedProject && currentProject) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-6 max-w-5xl">
            <button
              onClick={() => setSelectedProject(null)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar aos projetos
            </button>

            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl md:text-5xl font-light text-foreground">
                {currentProject.title}
              </h1>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  if (confirm("Tem certeza que deseja excluir este projeto?")) {
                    deleteProject.mutate(currentProject.id);
                  }
                }}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Excluir Projeto
              </Button>
            </div>

            {/* Upload area */}
            <div className="border-2 border-dashed border-border rounded-lg p-8 mb-8 text-center">
              <Upload className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">Arraste imagens ou clique para enviar</p>
              <label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button variant="outline" asChild>
                  <span>Selecionar Imagens</span>
                </Button>
              </label>
            </div>

            {/* Images grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <div key={image.id} className="relative group rounded-lg overflow-hidden border border-border">
                  <img
                    src={image.image_url}
                    alt=""
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => setCover.mutate(image.id)}
                      className={`p-2 rounded-full transition-colors ${
                        image.is_cover
                          ? "bg-yellow-500 text-white"
                          : "bg-white/80 text-foreground hover:bg-yellow-500 hover:text-white"
                      }`}
                      title="Definir como capa"
                    >
                      <Star className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Remover esta imagem?")) deleteImage.mutate(image);
                      }}
                      className="p-2 rounded-full bg-white/80 text-destructive hover:bg-destructive hover:text-white transition-colors"
                      title="Remover imagem"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {image.is_cover && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                      CAPA
                    </div>
                  )}
                </div>
              ))}
            </div>

            {images.length === 0 && (
              <p className="text-center text-muted-foreground py-12">
                Nenhuma imagem neste projeto. Envie imagens acima.
              </p>
            )}
          </div>
        </section>
      </div>
    );
  }

  // Projects list view
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-3xl md:text-5xl font-light text-foreground">
              GERENCIAR PROJETOS
            </h1>
            <div className="flex gap-2">
              <Button onClick={() => setShowNewProject(!showNewProject)}>
                <Plus className="w-4 h-4 mr-1" />
                Novo Projeto
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-1" />
                Sair
              </Button>
            </div>
          </div>

          {/* New project form */}
          {showNewProject && (
            <div className="border border-border rounded-lg p-6 mb-8 space-y-4">
              <h3 className="text-lg font-medium">Novo Projeto</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="Título *"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                />
                <Input
                  placeholder="Localização"
                  value={newProject.location}
                  onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                />
                <Input
                  placeholder="Categoria"
                  value={newProject.category}
                  onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                />
                <Input
                  placeholder="Área (ex: 450 M²)"
                  value={newProject.area}
                  onChange={(e) => setNewProject({ ...newProject, area: e.target.value })}
                />
                <Input
                  placeholder="Ano"
                  value={newProject.year}
                  onChange={(e) => setNewProject({ ...newProject, year: e.target.value })}
                />
              </div>
              <Textarea
                placeholder="Descrição"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              />
              <div className="flex gap-2">
                <Button onClick={() => createProject.mutate()} disabled={!newProject.title}>
                  Criar Projeto
                </Button>
                <Button variant="outline" onClick={() => setShowNewProject(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          )}

          {/* Projects list */}
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project.id)}
                className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted cursor-pointer transition-colors"
              >
                <GripVertical className="w-5 h-5 text-muted-foreground" />
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {[project.location, project.area, project.year].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {project.category}
                </span>
              </div>
            ))}
          </div>

          {projects.length === 0 && !showNewProject && (
            <p className="text-center text-muted-foreground py-12">
              Nenhum projeto ainda. Clique em "Novo Projeto" para começar.
            </p>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Admin;
