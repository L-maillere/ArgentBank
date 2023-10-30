import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeUsername } from "../../features/authentification/changeusername";

function HeaderDashboard() {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const userName = useSelector(state => state.authentification.userInfo?.userName);
    const firstName = useSelector(state => state.authentification.userInfo?.firstName);
    const lastName = useSelector(state => state.authentification.userInfo?.lastName);
    const currentToken = useSelector(state => state.authentification.token);
    const changeUsernameStatus = useSelector(state => state.authentification.changeUsernameStatus);

    const handleUsernameChange = async (event) => {
        event.preventDefault();

        const newUsername = event.target.userNameInput.value;

        await dispatch(changeUsername({ newUsername, token: currentToken }));
    };

    useEffect(() => {
        if (changeUsernameStatus === 'pending') {
            dispatch({ type: 'resetChangeUsernameStatus' });
        }
    }, [changeUsernameStatus, dispatch]);

    useEffect(() => {
        if (changeUsernameStatus === 'success') {
            setIsEditing(false);
        }
    }, [changeUsernameStatus]);

    return (
        <div className="header">
            {isEditing ? (
                <form className="header-form" onSubmit={handleUsernameChange}>
                    <h1>Edit user info</h1>
                    <div className="input-wrapper">
                        <label htmlFor="userNameInput">User name :</label>
                        <input 
                            type="text"
                            name="userNameInput" 
                            defaultValue={userName} 
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="firstNameInput">First name :</label>
                        <input
                            type="text"
                            name="firstNameInput"
                            value={firstName}
                            disabled
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="lastNameInput">Last name :</label>
                        <input
                            type="text"
                            value={lastName}
                            name="lastNameInput"
                            disabled
                        />
                    </div>
                    <div className="button-wrapper">
                        <button
                            className="button form"
                            type="submit"
                        >
                            Save
                        </button>
                        <button
                            className="button form"
                            type="button"
                            onClick={() => setIsEditing(false)}
                        >
                        Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <>
                    <h1>Welcome back<br />{firstName} {lastName}!</h1>
                    <button className="button edit" onClick={() => setIsEditing(true)}>Edit Name</button>
                </>
            )}
        </div>
    );
}

export default HeaderDashboard