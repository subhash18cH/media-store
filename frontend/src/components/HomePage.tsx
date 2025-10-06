import FileUpload from "./FileUpload"
import MediaList from "./MediaList"

const HomePage = () => {
  return (
    <div className="bg-zinc-900 pt-28 pb-16">
      <FileUpload />
      <MediaList />
    </div>
  )
}

export default HomePage