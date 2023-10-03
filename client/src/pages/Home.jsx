import AddNoteModal from "../components/AddNoteModal";
import Header from "../components/Header";
import Notes from "../components/Notes";

export default function Home() {
  return (<>
    <Header />
      <div className="container mt-4">
        <AddNoteModal />
        <Notes />
      </div>
    </>)
}
