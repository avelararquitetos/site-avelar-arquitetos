
DROP POLICY IF EXISTS "Authenticated delete project-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated update project-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload project-images" ON storage.objects;

CREATE POLICY "Admins upload project-images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update project-images"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete project-images"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'));
