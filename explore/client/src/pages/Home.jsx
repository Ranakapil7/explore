import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-[#6B4423] mb-6">
        Welcome to Mood Explorer
      </h1>
      <p className="text-xl text-[#6B4423] mb-8">
        Discover experiences tailored to your mood and make every day extraordinary
      </p>
      <div className="space-x-4">
        <Link to="/explore" className="btn-primary">
          Start Exploring
        </Link>
        <Link to="/login" className="btn-secondary">
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default Home;