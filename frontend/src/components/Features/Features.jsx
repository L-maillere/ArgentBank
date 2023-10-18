import ChatIcon from '../../assets/icon-chat.png'
import MoneyIcon from '../../assets/icon-money.png'
import SecurityIcon from '../../assets/icon-security.png'

function Features () {
    return (
        <section className="features">
            <h2 className="sr-only">Features</h2>
            <div className="features-item">
                <img src={ChatIcon} alt="Chat Icon" className="features-icon" />
                <h3 className="features-item-title">You are our #1 priority</h3>
                <p>
                    Need to talk to a representative? You can get in touch through our
                    24/7 chat or through a phone call in less than 5 minutes.
                </p>
            </div>
            <div className="features-item">
                <img
                    src={MoneyIcon}
                    alt="Chat Icon"
                    className="features-icon"
                />
                <h3 className="features-item-title">More savings means higher rates</h3>
                <p>
                    The more you save with us, the higher your interest rate will be!
                </p>
            </div>
            <div className="features-item">
                <img
                    src={SecurityIcon}
                    alt="Chat Icon"
                    className="features-icon"
                />
                <h3 className="features-item-title">Security you can trust</h3>
                <p>
                    We use top of the line encryption to make sure your data and money
                    is always safe.
                </p>
            </div>
        </section>
    )
}

export default Features