import { FormField } from "../FormField";
import { Button } from "../Button";
import "./NoteForm.css";
import { z } from "zod";
import { FC } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createNote } from "../../api/Notes";
import { queryClient } from "../../api/queryClient";

export interface INoteFormProps {}

const CreateNoteSchema = z.object({
  title: z.string().min(5, "Длинна поста должна быть не менее 10 символов"),
  text: z.string().min(6, "Длинна поста должна быть не менее 16 символов"),
})

type CreateNoteForm = z.infer<typeof CreateNoteSchema>

export const NoteForm: FC<INoteFormProps> = () => {

  const {register, handleSubmit, reset, formState:{errors}} = useForm<CreateNoteForm>({
    resolver: zodResolver(CreateNoteSchema),
  
  });

  const createNoteMutation = useMutation (
    {
    mutationFn: createNote,
    onSuccess() {
      queryClient.invalidateQueries({queryKey: ["notes"]});
      reset();
    }
  }, queryClient)

  return (
    <form onSubmit={handleSubmit((formData) => { createNoteMutation.mutate(JSON.stringify(formData))})} className="note-form">
      
       <FormField label="Заголовок" errorMessage={errors.text?.message}>
        <input type="text"{...register("text")} />
      </FormField>

      <FormField label="Текст" errorMessage={errors.title?.message}>
        <textarea  {...register("title")}/>
      </FormField>
      <Button type="submit" title="Опубликовать" isLoading={createNoteMutation.isPending}>Опубликовать</Button>
    </form>
          
  );
};
