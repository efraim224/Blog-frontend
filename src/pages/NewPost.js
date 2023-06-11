import axios from "axios";

const NewPost = () => {

    const link = `${process.env.REACT_APP_BACK_API}/posts`
    const handleSubmit = (event) => {
        event.preventDefault();
        const title = event.target.form_title.value;
        const content = event.target.form_content.value;
        const fetchData = async () => {
            try {
                axios.post(link, {
                    "title": title,
                    "content": content
                })
            }
            catch (e) {
                console.log(e)
            }
        }

        fetchData();
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" id="form_title" />
                </label>
                <label>
                    Content:
                    <input type="textarea" id="form_content" rows={5} cols={5} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </>
    )
}


export default NewPost