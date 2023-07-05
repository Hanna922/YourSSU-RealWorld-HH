import { useEffect, useState } from 'react'

import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { getArticle, postArticle, putArticle } from '@/lib/client/endpoints/article.endpoint'

import { getArticleQuery } from './ArticlePage/queries/getArticleQuery'

interface CreateForm {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
}

const EditorPage = () => {
  const { slug: _slug } = useParams()
  const slug: string = _slug || ''
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: article } = useQuery(['article', slug], () => getArticleQuery(slug))
  const { handleSubmit, register, setValue, getValues, watch } = useForm<CreateForm>({
    defaultValues: {
      tagList: [],
    },
  })
  const [errorMessages, setErrorMessages] = useState<string[]>([])
  const [tagInput, setTagInput] = useState<string>('')

  useEffect(() => {
    if (!article) return
    setValue('slug', article.slug)
    setValue('title', article.title)
    setValue('description', article.description)
    setValue('body', article.body)
    setValue('tagList', article.tagList)
  }, [article, setValue])

  const { mutate, isLoading } = useMutation(putArticle, {
    onSuccess: (data) => {
      setErrorMessages([])
      queryClient.invalidateQueries(['article', data.article.slug])
      navigate(`/article/${data.article.slug}`)
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setErrorMessages(
          Object.entries(error.response?.data.errors).map(([key, value]) => `${key} ${value}`)
        )
      }
    },
  })

  const submit = async (data: CreateForm) => {
    if (!slug) return

    mutate({
      slug: slug,
      article: {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: data.tagList,
      },
    })
  }

  const addTag = (tag: string) => {
    const _tagList = getValues('tagList')
    if (_tagList.includes(tag)) return
    setValue('tagList', [..._tagList, tag])
  }

  const removeTag = (tag: string) => {
    const _tagList = getValues('tagList')
    setValue(
      'tagList',
      _tagList.filter((_tag) => _tag !== tag)
    )
  }

  return (
    <>
      <Navbar />

      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              {errorMessages.length !== 0 && (
                <ul className="error-messages">
                  {errorMessages.map((message, index) => (
                    <li key={index}>{message}</li>
                  ))}
                </ul>
              )}
              <form onSubmit={handleSubmit(submit)}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Article Title"
                      {...register('title')}
                      readOnly={isLoading}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="What's this article about?"
                      {...register('description')}
                      readOnly={isLoading}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows={8}
                      placeholder="Write your article (in markdown)"
                      {...register('body')}
                      readOnly={isLoading}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter tags"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addTag(tagInput)
                          setTagInput('')
                        }
                      }}
                      readOnly={isLoading}
                    />
                    <div className="tag-list">
                      {watch('tagList').map((tag) => (
                        <span
                          className="tag-default tag-pill"
                          key={tag}
                        >
                          <i
                            className="ion-close-round"
                            onClick={() => removeTag(tag)}
                          />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </fieldset>
                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="submit"
                  >
                    Publish Article
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default EditorPage
