import { toast } from "react-toastify";

/**
 * Returns a form submission listener with the basic boilerplate dealt with.
 */
export default function useForm() {
  return (
    e: React.FormEvent<HTMLFormElement>,
    listener: React.FormEventHandler<HTMLFormElement>
  ) => {
    toast.dismiss();
    e.preventDefault();

    listener(e);
  };
}
