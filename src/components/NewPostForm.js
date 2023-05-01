

const NewPostForm = () => {

    return (
        <>
            <form>
                <label>
                    Title:
                    <input type="text" name="title"/>
                </label>
                <label>
                    Content:
                    <input type="textarea" name="content" rows={5}  cols={5}/>
                </label>
                <input type="submit" value="Submit" />
            </form>
        </>
    )
}


export default NewPostForm