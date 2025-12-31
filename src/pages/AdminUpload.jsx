import { useState } from "react";
import { uploadFile } from "../utils/uploadToSupabase";
import { uploadTrack } from "../api/auth.js";

export default function AdminUpload() {
  const [form, setForm] = useState({
    title: "",
    artist: "",
    category: "",
    type: "music",
  });
  const [audio, setAudio] = useState(null);
  const [cover, setCover] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      setLoading(true);

      const audioUrl = await uploadFile("audio-files", audio);
      const coverUrl = await uploadFile("covers", cover);

      await uploadTrack({
        ...form,
        audio_url: audioUrl,
        cover_url: coverUrl,
      });

      alert("Uploaded successfully ✅");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Admin Upload</h1>

      <input
        placeholder="Title"
        className="input"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        placeholder="Artist"
        className="input"
        onChange={(e) => setForm({ ...form, artist: e.target.value })}
      />

      <input
        placeholder="Category"
        className="input"
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />

      <select
        className="input"
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      >
        <option value="music">Music</option>
        <option value="podcast">Podcast</option>
      </select>

      <input type="file" accept="audio/*" onChange={(e) => setAudio(e.target.files[0])} />
      <input type="file" accept="image/*" onChange={(e) => setCover(e.target.files[0])} />

      <button
        onClick={submit}
        disabled={loading}
        className="bg-green-600 px-4 py-2 rounded mt-4"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
