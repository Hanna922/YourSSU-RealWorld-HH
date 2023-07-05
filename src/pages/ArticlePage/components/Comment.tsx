import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import {
  deleteArticleComment,
  postArticleComment,
} from '@/lib/client/endpoints/article.comment.endpoint'

import { getArticleCommentQuery } from '../queries/getArticleCommentQuery'

interface CommentForm {
  comment: string
}

export const Comment = ({ slug }: { slug: string }) => {
  const queryClient = useQueryClient()

  const { mutate: postArticleCommentMutate, isLoading } = useMutation(postArticleComment, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['comment', slug])
    },
  })
  const { handleSubmit, register, reset } = useForm<CommentForm>()

  const submit = async (data: CommentForm) => {
    postArticleCommentMutate({
      slug: slug,
      comment: {
        body: data.comment,
      },
    })
    reset()
  }

  const { data: comment } = useQuery(['comment', slug], () => getArticleCommentQuery(slug || ''))

  const { mutate: deleteArticleCommentMutate } = useMutation(deleteArticleComment, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['comment', slug])
    },
  })

  const handleDelete = (id: number) => {
    deleteArticleCommentMutate({
      slug: slug,
      id: id,
    })
  }

  return (
    <div className="row">
      <div className="col-xs-12 col-md-8 offset-md-2">
        <form
          className="card comment-form"
          onSubmit={handleSubmit(submit)}
        >
          <div className="card-block">
            <textarea
              className="form-control"
              placeholder="Write a comment..."
              rows={3}
              {...register('comment')}
              readOnly={isLoading}
            ></textarea>
          </div>
          <div className="card-footer">
            <img
              src="http://i.imgur.com/Qr71crq.jpg"
              className="comment-author-img"
            />
            <button
              className="btn btn-sm btn-primary"
              type="submit"
            >
              Post Comment
            </button>
          </div>
        </form>
        {comment &&
          comment.map((comment) => (
            <div
              className="card"
              key={comment.id}
            >
              <div className="card-block">
                <p className="card-text">{comment.body}</p>
              </div>
              <div className="card-footer">
                <a
                  href=""
                  className="comment-author"
                >
                  <img
                    src={comment.author.image}
                    className="comment-author-img"
                  />
                </a>
                &nbsp;
                <a
                  href=""
                  className="comment-author"
                >
                  {comment.author.username}
                </a>
                <span className="date-posted">{comment.createdAt}</span>
                <span className="mod-options">
                  <i
                    className="ion-trash-a"
                    onClick={() => handleDelete(comment.id)}
                  />
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
