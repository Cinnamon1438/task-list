import { supabase } from './supabase';

export async function getTasks(page = 1, limit = 5) {
  const pageNum = Number(page) || 1;
  const from = (pageNum - 1) * limit;
  const to = from + limit - 1;

  // Mengambil data sekaligus total count baris dari Supabase
  const { data, count, error } = await supabase
    .from('tasks')
    .select('*', { count: 'exact' })
    .order('id', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('Error fetching tasks:', error.message);
    return { 
      data: [], 
      meta: { total: 0, current_page: 1, last_page: 1, from: 0, to: 0 } 
    };
  }

  const total = count || 0;
  const lastPage = Math.ceil(total / limit) || 1;

  return {
    data: data || [],
    meta: {
      total,
      current_page: pageNum,
      last_page: lastPage,
      from: total > 0 ? from + 1 : 0,
      to: Math.min(to + 1, total),
    },
  };
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
