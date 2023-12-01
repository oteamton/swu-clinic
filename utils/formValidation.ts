import { ref } from "vue";

export const ValidationState = (formData: any) => {
    return {
        name: {
            error: ref(''),
            validate: () => {
                if(!formData.name){
                    return 'Name is required';
                }
            }
        }
    }
}