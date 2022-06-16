const Notification = ({color, message}) => {
    if(message === null){
        return null
    }
    return(
        <div style={{color: color}} className="notification">
            {message}
        </div>
    )
}

export default Notification