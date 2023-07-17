
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';



const Author = (props) => {



    const getAvatarName = (name) => {
        if (name === undefined) return 'AN'
        if (name === "") return 'AN'
        const full = name.trim().split(' ')

        if (full.length === 1) return full[0][0]
        else {
            return `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
        }
    }


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

    return (
        <Stack sx={{ marginTop: 2, marginBottom: 2 }} direction="row" spacing={1}>
            <Avatar
                alt={props.name}
                aria-setsize={0.5}
                children={getAvatarName(props.name)}
                sx={{ width: 24, height: 24, backgroundColor: stringToColor(props.name ?? "") }}
            />
            <Stack direction="column" spacing={1} width={1}>
                <Box sx={{ lineHeight: '1.25rem', fontWeight:'500', fontSize: '18px'}} className="comment-user">{props.name}</Box>
                <Box sx={{ lineHeight: '1.25rem', fontWeight: 'light', fontSize: '0.875rem', fontStyle: 'oblique', textAlign: 'left' }} className="comment-content">
                    {props.created_at}
                </Box>
            </Stack>

        </Stack>
    )
}


export default Author;