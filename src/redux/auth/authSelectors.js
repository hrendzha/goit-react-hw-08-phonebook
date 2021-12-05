const selectIsLoggedIn = state => state.auth.isLoggedIn;
const selectCurrentUser = state => state.auth.user;
const selectToken = state => state.auth.token;

export default { selectIsLoggedIn, selectCurrentUser, selectToken };
