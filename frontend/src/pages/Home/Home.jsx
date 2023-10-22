import Banner from '../../components/Banner/Banner';
import Features from '../../components/Features/Features';
import ChatIcon from '../../assets/icon-chat.webp'
import MoneyIcon from '../../assets/icon-money.webp'
import SecurityIcon from '../../assets/icon-security.webp'

function Home () {
    return (
        <>
            <Banner />
            <section className="features">
                <h2 className="sr-only">Features</h2>
                <Features 
                    img={ChatIcon}
                    title="More savings means higher rates"
                    text="The more you save with us, the higher your interest rate will be!"
                />
                <Features 
                    img={MoneyIcon}
                    title="More savings means higher rates"
                    text="The more you save with us, the higher your interest rate will be!"
                />
                <Features
                    img={SecurityIcon}
                    title="Security you can trust"
                    text="We use top of the line encryption to make sure your data and money is always safe."
                />
            </section>
        </>
    )
}

export default Home;