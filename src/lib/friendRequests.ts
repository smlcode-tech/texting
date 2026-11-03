// Arkadaşlık isteği listesi için saf yardımcılar.
// Mimarideki yeri: useFriendRequests hook'unun RPC'den aldığı tek listeyi
// arayüzün ayrı gösterdiği iki gruba böler; React'ten bağımsız olduğu için
// ayrı test edilebilir.
import type { FriendRequest } from '../types/chat'

/**
 * get_friend_requests tek liste döndürür (tek round-trip için);
 * arayüz gelenleri kabul/ret düğmeleriyle, gidenleri yalnızca bilgi olarak gösterir.
 */
export function partitionRequests(requests: FriendRequest[]): {
  incoming: FriendRequest[]
  outgoing: FriendRequest[]
} {
  return {
    incoming: requests.filter((request) => request.direction === 'incoming'),
    outgoing: requests.filter((request) => request.direction === 'outgoing'),
  }
}
