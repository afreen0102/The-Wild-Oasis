
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from 'react-hook-form';
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import FormRow from "../../ui/FormRow";


function CreateCabinForm({ cabinToEdit = {} }) {

  const { id: editId, ...editValues } = cabinToEdit;

  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState  } = useForm({
    defaultValues: isEditSession ? editValues : {}
  });

  const { errors } = formState;
  console.log(errors);

  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('New cabin succesfully created');
      queryClient.invalidateQueries({ queryKey: ["cabins"]});
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({newCabinData, id}) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin succesfully edited');
      queryClient.invalidateQueries({ queryKey: ["cabins"]});
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const isWorking = isCreating || isEditing;


  function onSubmit(data) {

    
    if(isEditSession) editCabin();
    else createCabin({...data, image: data.image[0]}, editId);
  }

  function onError(){
    console.log('error');
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      {/* <FormRow2>
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" {...register("name", {
          required: "This field is required"
        })} />
        {
          errors?.name?.message && <Error>{errors.name.message}</Error>
        }
      </FormRow2> */}

      <FormRow error={errors?.name?.message} label='Cabin name'>
      <Input type="text" disabled={isCreating} id="name" {...register("name", {
          required: "This field is required"
        })} />
      </FormRow>

      {/* <FormRow2>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type="number" id="maxCapacity" {...register("maxCapacity", {
          required: "This field is required",
          min: {
            value: 1,
            message: 'Capacity should be atleast one'
          },
        })}  />
      </FormRow2> */}

      <FormRow error={errors?.maxCapacity?.message} label='Maximum capacity'>
      <Input type="number" disabled={isCreating} id="maxCapacity" {...register("maxCapacity", {
          required: "This field is required",
          min: {
            value: 1,
            message: 'Capacity should be atleast one'
          },
        })}  />
      </FormRow>

      {/* <FormRow2>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input type="number" id="regularPrice" {...register("regularPrice", {
          required: "This field is required",
          min: {
            value: 1,
            message: 'Capacity should be atleast one'
          },
        })} />
      </FormRow2> */}

      <FormRow error={errors?.regularPrice?.message} label='Regular price'>
      <Input type="number" disabled={isCreating} id="regularPrice" {...register("regularPrice", {
          required: "This field is required",
          min: {
            value: 1,
            message: 'Capacity should be atleast one'
          },
        })} />
      </FormRow>

      {/* <FormRow2>
        <Label htmlFor="discount">Discount</Label>
        <Input type="number" id="discount" defaultValue={0} {...register("regularPrice", {
          required: "This field is required",
          validate: (value) => value <= getValues().regularPrice || 'Discount should be less than regular price'
        })}  />
      </FormRow2> */}

      <FormRow error={errors?.discount?.message} label='Discount'>
      <Input type="number" disabled={isCreating} id="discount" defaultValue={ 0 } {...register("discount", {
          required: "This field is required",
          validate: (value) => value <= getValues().regularPrice || 'Discount should be less than regular price'
          // validate: (value) => value < 100 || 'what the hell are you doing'
        })}  />
      </FormRow>

      {/* <FormRow2>
        <Label htmlFor="description">Description for website</Label>
        <Textarea type="number" id="description" defaultValue="" {...register("regularPrice", {
          required: "This field is required"
        })} />
      </FormRow2> */}

      <FormRow error={errors?.description?.message} label='Description for website'>
      <Textarea type="number" disabled={isCreating} id="description" defaultValue="" {...register("description", {
          required: "This field is required"
        })} />
      </FormRow>


      {/* <FormRow2>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" {...register("image", {
          required: "This field is required"
        })}  />
      </FormRow2> */}

      <FormRow error={errors?.image?.message} label='Cabin photo'>
      <FileInput id="image" disabled={isCreating} accept="image/*" {...register("image", {
          required: isEditSession ? false :"This field is required" 
        })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>{ isEditSession ? 'Edit cabin' : 'Create new cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
