function Features ({ img, title, text}) {
    return (
        <div className="features-item">
            <img src={img} alt="Chat Icon" className="features-icon" />
            <h3 className="features-item-title">{title}</h3>
            <p>{text}</p>
        </div>
    )
}

export default Features