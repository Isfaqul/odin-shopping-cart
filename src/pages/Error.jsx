import { useNavigate } from "react-router-dom"

export default function Error() {
  const navigate = useNavigate();

  return (
    <main className="main flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-9xl">404</h1>
        <p className="text-2xl">Ooops! Something went wrong</p>
        <button type='button' className="block w-full mt-5 cursor-pointer border bg-neutral-800 text-neutral-100 uppercase py-2 rounded-sm" onClick={() => navigate(-1)}>Click to go back</button>
      </div>
    </main>
  )
}
