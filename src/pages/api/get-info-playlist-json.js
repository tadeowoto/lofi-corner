import { allPlaylists, songs } from "../../lib/data";

export async function GET({ request }) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const playlist = allPlaylists.find((playlist) => playlist.id === id); // buscamos playlist por id
  const playlistSongs = songs.filter(
    (song) => song.albumId === playlist.albumId
  ); // buscamos canciones por albumId

  return new Response(JSON.stringify({ playlist, songs: playlistSongs }));
}
