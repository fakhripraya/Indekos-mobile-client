import {
    CHAT_ROOMS,
    CHAT_ROOM_CHATS,
    CHAT_ROOM_MEMBERS
} from './types'

// chatRoomsChange is a redux action to store temporary generic message modal state
export const chatRoomsChange = ({ chat_rooms }) => {
    return {
        type: CHAT_ROOMS,
        chat_rooms: chat_rooms,
    }
}

// chatRoomMembersChange is a redux action to store temporary generic message modal state
export const chatRoomMembersChange = ({ chat_room_members }) => {
    return {
        type: CHAT_ROOM_MEMBERS,
        chat_room_members: chat_room_members,
    }
}

// chatRoomChatsChange is a redux action to store temporary generic message modal state
export const chatRoomChatsChange = ({ chat_room_chats }) => {
    return {
        type: CHAT_ROOM_CHATS,
        chat_room_chats: chat_room_chats,
    }
}
