import {UseMutationCustomOptions} from '@/types/common';
import {useMutation} from '@tanstack/react-query';
import {createPost} from '@/api';

function useMutateCreatePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: createPost,
    ...mutationOptions,
  });
}

export default useMutateCreatePost;
