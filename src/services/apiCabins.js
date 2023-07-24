import supabase, { supabaseUrl } from "./supabase";


export async function getCabins() {

  let { data, error } = await supabase
  .from('cabins')
  .select('*');

  if(error) 
  {
    console.error(error)
    throw new Error('Cabins could not be loaded')
  }

  return data;

}

export async function deleteCabin(id) {

  const { data, error } = await supabase
  .from('cabins')
  .delete()
  .eq('id', id);

  if(error) 
  {
    console.error(error)
    throw new Error('Cabins could not be deleted');
  }

  return data;

}

export async function createEditCabin(newCabin, id) {

const hasImagePath = newCabin.image?.startsWith(supabase); 

const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/","");  

const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

//https://oxtwjclmiyuglsviklnv.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg  
 
// Create/Edit cabin  
let query = supabase.from("cabins");

// Create
if(!id) 
query
.insert([
  {...newCabin, image: imagePath }
])

// Edit
id(id)
query
.update({...newCabin, image: imagePath })
.eq("id", id);


const { data, error } = await query.select()
.single();

if(error) 
  {
    console.error(error)
    throw new Error('Cabin could not be created');
  }

  // 2.Upload image
  const { error: storageError } = await supabase.storage.from("cabin-images").upload(imageName, newCabin.image);

  // 3. Delete the cabin if there is an error uploading
  if(storageError) {
    await supabase
    .from('cabins')
    .delete()
    .eq('id', data.id);
    console.error(storageError)
    throw new Error('Cabin image could not be uploaded and the cabin was not created');
  }

  return data;

}