export const actionType = {
    SET_USER:'SET_USER',
    SET_ALL_USER:'SET_ALL_USER',
    SET_ALL_SONG:'SET_ALL_SONG',
    SET_ALL_ALBUM:'SET_ALL_ALBUM',
    SET_ALL_ARTIST:'SET_ALL_ARTIST',
    SET_FILTER_ARTIST:'SET_FILTER_ARTIST',
    SET_FILTER_ALBUM:'SET_FILTER_ALBUM',
    SET_FILTER_LANGUAGE:'SET_FILTER_LANGUAGE',
    SET_FILTER_CATEGORY:'SET_FILTER_CATEGORY',
    SET_ALERT_TYPE:'SET_ALERT_TYPE',
    SET_SONG_PLAYING:'SET_SONG_PLAYING',
    SET_SONG_INDEX:'SET_SONG_INDEX'
}

const reducer = (state,action) => {
   // console.log(action);

    switch(action.type){
        case actionType.SET_USER:
            return {
                ...state,
                user : action.user,
            }
        
        case actionType.SET_ALL_USER:
            return{
                ...state,
                allUsers:action.allUsers,
            }
        
            case actionType.SET_ALL_SONG:
            return{
                ...state,
                allSongs:action.allSongs,
            }
        
            case actionType.SET_ALL_ALBUM:
            return{
                ...state,
                allAlbums:action.allAlbums,
            }
        
            case actionType.SET_ALL_ARTIST:
            return{
                ...state,
                allArtists:action.allArtists,
            }

            case actionType.SET_FILTER_ARTIST:
            return{
                ...state,
                filterArtist:action.filterArtist,
            }

            case actionType.SET_FILTER_ALBUM:
            return{
                ...state,
                filterAlbum:action.filterAlbum,
            }

            case actionType.SET_FILTER_LANGUAGE:
            return{
                ...state,
                filterLanguage:action.filterLanguage,
            }

            case actionType.SET_FILTER_CATEGORY:
            return{
                ...state,
                filterCategory:action.filterCategory,
            }
            case actionType.SET_ALERT_TYPE:
                return{
                    ...state,
                    alertType:action.alertType
                }
                case actionType.SET_SONG_PLAYING:
                    return{
                        ...state,
                        isSongPlaying:action.isSongPlaying,
                    }
                    case actionType.SET_SONG_INDEX:
                        return{
                            ...state,
                            songindex:action.songindex,
                        }     
        
        default :
         return state;
    }
}

export default reducer;