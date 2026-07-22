
-- projects
DROP POLICY IF EXISTS "Anyone can insert projects" ON public.projects;
DROP POLICY IF EXISTS "Anyone can update projects" ON public.projects;
DROP POLICY IF EXISTS "Anyone can delete projects" ON public.projects;

CREATE POLICY "Authenticated can insert projects" ON public.projects
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update projects" ON public.projects
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete projects" ON public.projects
  FOR DELETE TO authenticated USING (true);

-- project_images
DROP POLICY IF EXISTS "Anyone can insert project images" ON public.project_images;
DROP POLICY IF EXISTS "Anyone can update project images" ON public.project_images;
DROP POLICY IF EXISTS "Anyone can delete project images" ON public.project_images;

CREATE POLICY "Authenticated can insert project images" ON public.project_images
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update project images" ON public.project_images
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete project images" ON public.project_images
  FOR DELETE TO authenticated USING (true);

-- storage bucket "project-images"
DROP POLICY IF EXISTS "Public read project-images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload project-images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update project-images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete project-images" ON storage.objects;
DROP POLICY IF EXISTS "Public read project images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload project images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update project images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete project images" ON storage.objects;

CREATE POLICY "Public read project-images bucket" ON storage.objects
  FOR SELECT USING (bucket_id = 'project-images');
CREATE POLICY "Authenticated upload project-images" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'project-images');
CREATE POLICY "Authenticated update project-images" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'project-images') WITH CHECK (bucket_id = 'project-images');
CREATE POLICY "Authenticated delete project-images" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'project-images');
