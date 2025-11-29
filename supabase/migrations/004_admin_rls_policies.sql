-- Update RLS policies to allow admins full access

-- Drop existing policies that restrict admin access
DROP POLICY IF EXISTS "Users can view their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can create their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can update their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can delete their own projects" ON public.projects;

-- Create new policies that allow admins full access
CREATE POLICY "Users can view their own projects or admins see all"
  ON public.projects FOR SELECT
  USING (user_id = auth.uid() OR is_admin(auth.uid()));

CREATE POLICY "Users can create their own projects or admins create any"
  ON public.projects FOR INSERT
  WITH CHECK (user_id = auth.uid() OR is_admin(auth.uid()));

CREATE POLICY "Users can update their own projects or admins update any"
  ON public.projects FOR UPDATE
  USING (user_id = auth.uid() OR is_admin(auth.uid()));

CREATE POLICY "Users can delete their own projects or admins delete any"
  ON public.projects FOR DELETE
  USING (user_id = auth.uid() OR is_admin(auth.uid()));

-- Update project_phases policies
DROP POLICY IF EXISTS "Users can view phases of their projects" ON public.project_phases;
DROP POLICY IF EXISTS "Users can create phases for their projects" ON public.project_phases;
DROP POLICY IF EXISTS "Users can update phases of their projects" ON public.project_phases;
DROP POLICY IF EXISTS "Users can delete phases of their projects" ON public.project_phases;

CREATE POLICY "Users can view phases of their projects or admins see all"
  ON public.project_phases FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_phases.project_id
      AND projects.user_id = auth.uid()
    )
    OR is_admin(auth.uid())
  );

CREATE POLICY "Users can create phases for their projects or admins create any"
  ON public.project_phases FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_phases.project_id
      AND projects.user_id = auth.uid()
    )
    OR is_admin(auth.uid())
  );

CREATE POLICY "Users can update phases of their projects or admins update any"
  ON public.project_phases FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_phases.project_id
      AND projects.user_id = auth.uid()
    )
    OR is_admin(auth.uid())
  );

CREATE POLICY "Users can delete phases of their projects or admins delete any"
  ON public.project_phases FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_phases.project_id
      AND projects.user_id = auth.uid()
    )
    OR is_admin(auth.uid())
  );

-- Update project_updates policies
DROP POLICY IF EXISTS "Users can view updates of their projects" ON public.project_updates;
DROP POLICY IF EXISTS "Users can create updates for their projects" ON public.project_updates;
DROP POLICY IF EXISTS "Users can update updates of their projects" ON public.project_updates;
DROP POLICY IF EXISTS "Users can delete updates of their projects" ON public.project_updates;

CREATE POLICY "Users can view updates of their projects or admins see all"
  ON public.project_updates FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_updates.project_id
      AND projects.user_id = auth.uid()
    )
    OR is_admin(auth.uid())
  );

CREATE POLICY "Users can create updates for their projects or admins create any"
  ON public.project_updates FOR INSERT
  WITH CHECK (
    (
      EXISTS (
        SELECT 1 FROM public.projects
        WHERE projects.id = project_updates.project_id
        AND projects.user_id = auth.uid()
      )
      AND auth.uid() = created_by
    )
    OR is_admin(auth.uid())
  );

CREATE POLICY "Users can update updates of their projects or admins update any"
  ON public.project_updates FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_updates.project_id
      AND projects.user_id = auth.uid()
    )
    OR is_admin(auth.uid())
  );

CREATE POLICY "Users can delete updates of their projects or admins delete any"
  ON public.project_updates FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_updates.project_id
      AND projects.user_id = auth.uid()
    )
    OR is_admin(auth.uid())
  );

-- Update project_files policies
DROP POLICY IF EXISTS "Users can view files of their projects" ON public.project_files;
DROP POLICY IF EXISTS "Users can create files for their projects" ON public.project_files;
DROP POLICY IF EXISTS "Users can delete files of their projects" ON public.project_files;

CREATE POLICY "Users can view files of their projects or admins see all"
  ON public.project_files FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_files.project_id
      AND projects.user_id = auth.uid()
    )
    OR is_admin(auth.uid())
  );

CREATE POLICY "Users can create files for their projects or admins create any"
  ON public.project_files FOR INSERT
  WITH CHECK (
    (
      EXISTS (
        SELECT 1 FROM public.projects
        WHERE projects.id = project_files.project_id
        AND projects.user_id = auth.uid()
      )
      AND auth.uid() = uploaded_by
    )
    OR is_admin(auth.uid())
  );

CREATE POLICY "Users can delete files of their projects or admins delete any"
  ON public.project_files FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_files.project_id
      AND projects.user_id = auth.uid()
    )
    OR is_admin(auth.uid())
  );

-- Allow admins to view all user profiles
CREATE POLICY "Admins can view all user profiles"
  ON public.user_profiles FOR SELECT
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins can update all user profiles"
  ON public.user_profiles FOR UPDATE
  USING (is_admin(auth.uid()));

