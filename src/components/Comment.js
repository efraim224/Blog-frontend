import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const Comment = (props) => {

    const stringToColor = (string) => {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }


    // const stringAvatar = (name) => {
    //     return {
    //         sx: {
    //             bgcolor: stringToColor(name),
    //         },
    //         children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    //     };
    // }



    const getAvatarName = (name) => {
        if (name === undefined) return 'AN'
        if (name === "") return 'AN'
        const full = name.trim().split(' ')

        if (full.length === 1) return full[0][0]
        else {
            return `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
        }
    }

    return (
        // <Stack direction={"column"} spacing={1} sx={{ backgroundColor: '#dedbd5' }}>
        //     <Stack direction="row" spacing={1}>
        //         <Avatar
        //             alt={props.name}
        //             children={getAvatarName(props.name)}
        //             sx={{ width: 24, height: 24, backgroundColor: stringToColor(props.name) }} />
        //         <div className="comment-user">{props.name}</div>
        //     </Stack>
        //     <div className="comment-content" dangerouslySetInnerHTML={{ __html: props.content }} />
        // </Stack>
        <Stack direction='row' spacing={1} margin={1} sx={{borderStyle: 'hidden hidden dotted hidden', borderBottom: '1'}} >
            <Avatar
                alt={props.name}
                children={getAvatarName(props.name)}
                sx={{ width: 24, height: 24, backgroundColor: stringToColor(props.name) }} />
            <Stack direction="column" spacing={1} width={1}>
                <div className="comment-user">{props.name}</div>
                <div className="comment-content" dangerouslySetInnerHTML={{ __html: props.content }} />
            </Stack>
            <div>{props.created_at}</div>
        </Stack>
    );
}

export default Comment;