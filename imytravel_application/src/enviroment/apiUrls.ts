export const apiUrls = {
  Authentication: {
    SignIn: 'auth/login',
    SignUp: 'auth/signup',
    findEmail: 'auth/findEmail',
    changepassword: 'auth/changepassword',
  },
  Business: {
    createPlaceSuggestion: 'admin/createPlaceSuggestion',
    updatePlaceSuggestion: 'admin/updatePlaceSuggestion',
    getAllPlaceSuggestions: 'admin/getAllPlaceSuggestions',
    deletePlaceSuggestion: 'admin/deletePlaceSuggestion',
    getTourLocationList: 'admin/getTourLocationList',
    getUserTourBookingList: 'admin/getUserTourBookingList',
  },
  Service: {
    addComment: 'user/addComment',
    updateComment: 'user/updateComment',
    getAllComments: 'user/getAllComments',
    deleteComment: 'user/deleteComment',
    createTravelExperience: 'user/createTravelExperience',
    updateTravelExperience: 'user/updateTravelExperience',
    getAllTravelExperiences: 'user/getAllTravelExperiences',
    deleteTravelExperience: 'user/deleteTravelExperience',
    getTravelExperiencesList:"user/getTravelExperiencesList"
  },
};
