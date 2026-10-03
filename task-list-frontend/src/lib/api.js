import { supabase } from './supabase';

export async function getTasks() {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    console.error('Error fetching tasks:', error.message);
    return { data: [] };
  }

  return { data: data || [] };
}

export async function getTask(id) {
  const numericId = Number(id);
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', numericId)
    .single();

  if (error) {
    console.error(`Error fetching task ${id}:`, error.message);
    return null;
  }

  return data;
}

export async function createTask(taskData) {
  const { data, error } = await supabase
    .from('tasks')
    .insert([taskData])
    .select();

  if (error) {
    console.error('Error creating task:', error.message);
    throw error;
  }

  return data;
}

export async function updateTask(id, taskData) {
  const numericId = Number(id);
  const { data, error } = await supabase
    .from('tasks')
    .update(taskData)
    .eq('id', numericId)
    .select();

  if (error) {
    console.error(`Error updating task ${id}:`, error.message);
    throw error;
  }

  return data;
}

export async function deleteTask(id) {
  const numericId = Number(id);
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', numericId);

  if (error) {
    console.error(`Error deleting task ${id}:`, error.message);
    throw error;
  }

  return true;
}
