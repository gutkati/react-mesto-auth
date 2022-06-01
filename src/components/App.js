import {useEffect, useState} from "react";
import {Route, Switch, useHistory, Redirect} from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js'
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import {api} from "../utils/Api";
import {authApi} from "../utils/AuthApi";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [emailUser, setEmailUser] = useState("");
    const history = useHistory();
    const [message, setMessage] = useState("");
    const [isSymbol, setIsSymbol] = useState(false);
    const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);

    function goToLogin() {
        history.push("/signin");
    }

    function goToRegister() {
        history.push("/signup");
    }

    function goOutMain() {
        localStorage.removeItem("jwt")
        history.push("/signin")
    }

    function checkToken() {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            authApi.getUserData(jwt).then((data) => {
                if (data) {
                    setLoggedIn(true);
                    history.push("/");
                    setEmailUser(data.data.email);
                }
            })
                .catch((err) => {
                    if (err === 401) {
                        console.log("401 - Токен не передан или передан не в том формате")
                    }
                    console.log("401 - Переданный токен не корректен")
                })
        }
    }

    function handlePageLogin() {
        setLoggedIn(true);
        checkToken();
    }

    function handleRegister(password, email) {
        authApi.registration(password, email)
            .then((res) => {
                if (res) {
                    setInfoTooltipOpen(true)
                    setIsSymbol(true);
                    setMessage("Вы успешно зарегестрировались");

                    history.push('/signin')
                }
            })
            .catch((err) => {
                if (err === 400) {
                    console.log("400 - некорректно заполнено одно из полей");
                }
                setInfoTooltipOpen(true)
                setIsSymbol(false);
                setMessage("Что-то пошло не так! Попробуйте ещё раз.");
            })
    }

    function handleLogin(password, email) {
        authApi.login(password, email)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem("jwt", data.token);
                    return data;
                }
            })
            .then((data) => {
                if (data.token) {
                    handlePageLogin();
                    history.push("/")
                }
            })
            .catch((err) => {
                if (err === 400) {
                    console.log("400 - не передано одно из полей")
                } else if (err === 401) {
                    console.log("401 - пользователь с email не найден")
                }
                setInfoTooltipOpen(true)
                setIsSymbol(false);
                setMessage("Что-то пошло не так! Попробуйте ещё раз.");
            })
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleCardClick(card) {
        setIsImagePopupOpen(true);
        setSelectedCard(card);
    }

    function handleUpdateUser(info) {
        api.editProfile(info)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups()
            })
            .catch((err) => console.log(err));
    }

    function handleUpdateAvatar(object) {
        api.newAvatar(object)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups()
            })
            .catch((err) => console.log(err));
    }

    function handleAddPlaceSubmit(object) {
        api.addCard(object)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups()
            })
            .catch((err) => console.log(err));
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeStatusLike(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) =>
                    state.map((c) => (c._id === card._id ? newCard : c)));
            })
            .catch((err) => console.log(err));
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then((res) => {
                setCards((state) =>
                    state.filter((c) => c._id !== card._id));
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        if (loggedIn) {
            api.getProfile()
                .then(setCurrentUser)
                .catch((err) => console.log(err));

            api.getInitialCards()
                .then(setCards)
                .catch((err) => console.log(err));
        }
        checkToken()
        setLoggedIn(true);
    }, [loggedIn]);


    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsImagePopupOpen(false);
        setSelectedCard({});
        setInfoTooltipOpen(false);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__container">
                    <Switch>

                        <Route path="/signup">
                            <Header nameButton="Войти" handleClick={goToLogin}/>
                            <Register onRegister={handleRegister}/>
                        </Route>

                        <Route path="/signin">
                            <Header nameButton="Регистрация" handleClick={goToRegister}/>
                            <Login onLogin={handleLogin}/>
                        </Route>

                        <ProtectedRoute exact path="/" loggedIn={loggedIn}>
                            <Header nameButton="Выйти" emailUser={emailUser} handleClick={goOutMain}/>
                            <Main onEditProfile={handleEditProfileClick}
                                  onAddPlace={handleAddPlaceClick}
                                  onEditAvatar={handleEditAvatarClick}
                                  onCardClick={handleCardClick}
                                  onCardDelete={handleCardDelete}
                                  onCardLike={handleCardLike}
                                  cards={cards}
                            />
                            <Footer/>

                        </ProtectedRoute>
                        <Route>
                            {loggedIn ? <Redirect to="/"/> : <Redirect to="signin"/>}
                        </Route>
                    </Switch>

                </div>

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}/>

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}/>

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}/>

                <ImagePopup
                    card={selectedCard}
                    isOpen={isImagePopupOpen}
                    onClose={closeAllPopups}/>

                <InfoTooltip
                    isOpen={infoTooltipOpen}
                    onClose={closeAllPopups}
                    symbol={isSymbol}
                    message={message}
                />

            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;

// {/*<PopupWithForm*/}
//        {/*    name={'remove-card'}*/}
//        {/*    title={'Вы уверены?'}*/}
//        {/*    titleButton={'Да'}*/}
//        {/*    isOpen={isImagePopupOpen}*/}
//        {/*    onClose={closeAllPopups}/>*/}