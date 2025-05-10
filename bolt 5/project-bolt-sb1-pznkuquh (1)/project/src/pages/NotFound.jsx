import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen pt-28 flex flex-col items-center justify-center px-4 text-center">
      <h1 className="font-serif text-6xl md:text-8xl font-bold text-primary-300 mb-4">404</h1>
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-secondary-800 mb-6">
        Page Not Found
      </h2>
      <p className="text-secondary-600 max-w-md mb-8">
        The cake you're looking for seems to have been eaten already! Let's find you something equally delicious.
      </p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound