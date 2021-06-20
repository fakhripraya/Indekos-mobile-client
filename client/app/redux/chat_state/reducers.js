import {
    CHAT_ROOMS,
    CHAT_ROOM_CHATS,
    CHAT_ROOM_MEMBERS
} from './types'
// chatRoomsState is a redux state of the generic message modal window
const chatRoomsState = {
    chat_rooms: []
}

// chatRoomMembersState is a redux state of the generic message modal window
const chatRoomMembersState = {
    chat_room_members: []
}

// chatRoomChatsState is a redux state of the generic message modal window
const chatRoomChatsState = {
    chat_room_chats: []
}

// chatRoomsReducer is a redux reducer of the generic message modal window
export const chatRoomsReducer = (state = chatRoomsState, action) => {
    switch (action.type) {
        case CHAT_ROOMS: return {
            ...state,
            chat_rooms: action.chat_rooms,
        }
        default: return state
    }
}

// chatRoomMembersReducer is a redux reducer of the generic message modal window
export const chatRoomMembersReducer = (state = chatRoomMembersState, action) => {
    switch (action.type) {
        case CHAT_ROOM_MEMBERS: return {
            ...state,
            chat_room_members: action.chat_room_members,
        }
        default: return state
    }
}

// chatRoomChatsReducer is a redux reducer of the generic message modal window
export const chatRoomChatsReducer = (state = chatRoomChatsState, action) => {
    switch (action.type) {
        case CHAT_ROOM_CHATS: return {
            ...state,
            chat_room_chats: action.chat_room_chats,
        }
        default: return state
    }
}