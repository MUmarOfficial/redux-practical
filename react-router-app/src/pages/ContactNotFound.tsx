import { Link } from "react-router-dom"

export const ContactNotFoundPage = () => {
  return <div className="flex justify-center items-center flex-col gap-4 m-4 p-2">
    <h1 className="text-4xl text-red-700 mb-4">(·•᷄‎ࡇ•᷅ ) Oops!</h1>
    <h2 className="text-xl">Contact not found</h2>
    <Link to={'/contacts'} className="text-blue-500 hover:underline">Go to Contacts page</Link>
  </div>
}