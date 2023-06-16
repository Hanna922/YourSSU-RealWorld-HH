const Pagination = ({
  totalPages,
  limit,
  currentPage,
  setPage,
}: {
  totalPages: number
  limit: number
  currentPage: number
  setPage: (page: number) => void
}) => {
  if (totalPages <= limit) {
    return <></>
  }

  const movePage = (e: React.MouseEvent<HTMLAnchorElement>, page: number) => {
    e.preventDefault()
    setPage(page)
  }

  return (
    <>
      <nav>
        <ul className="pagination">
          {new Array(Math.floor(totalPages / limit) + 1).fill(0).map((_, index) => (
            <li
              className={`page-item ng-scope ${currentPage === index + 1 ? 'active' : ''}`}
              key={index}
            >
              <a
                className="page-link ng-binding"
                href=""
                onClick={(e) => movePage(e, index + 1)}
              >
                {index + 1}
              </a>
            </li>
          ))}
        </ul>
      </nav>{' '}
    </>
  )
}

export default Pagination
