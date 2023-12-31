import { UserData } from "./authenticationStore";

export const useRoomStore = defineStore('room', () => {
  const room: Ref<RoomData> = ref({
    id: 0,
    name: '',
    created_at: '',
    updated_at: '',
    is_private: 1,
    members: [],
  });

  function setRoom(value: RoomData) {
    room.value = value;
  }

  const roomMessages: Ref<RoomMessagesData[]> = ref([]);

  function setRoomMessages(value: RoomMessagesData[]) {
    roomMessages.value = value;
  }

  function addRoomMessage(value: RoomMessagesData) {
    roomMessages.value.push(value);
  }

  return {
    room,
    setRoom,
    roomMessages,
    setRoomMessages,
    addRoomMessage,
  }
});

export interface RoomData {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  is_private: number;
  members?: UserData[]
  members_count?: number;
}

export interface RoomMemberData {
  chat_room_id: number;
  is_admin: number;
  user_id: number;
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