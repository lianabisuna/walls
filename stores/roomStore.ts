import { UserData } from "./authenticationStore";

export const useRoomStore = defineStore('room', () => {
  const room: Ref<RoomData> = ref({
    id: 0,
    name: '',
    created_at: '',
    updated_at: '',
    is_private: 1,
    members_count: 0,
  });

  function setRoom(value: RoomData) {
    room.value = value;
  }

  const roomMessages: Ref<RoomMessagesData[]> = ref([]);

  function setRoomMessages(value: RoomMessagesData[]) {
    roomMessages.value = value;
  }

  return {
    room,
    setRoom,
    roomMessages,
    setRoomMessages,
  }
});

export interface RoomData {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  is_private: number;
  members_count: number;
}

export interface RoomMessagesData {
  id: number;
  message: string;
  room_id: number;
  sender_id: number;
  created_at: string;
  updated_at: string;
  user: UserData
}