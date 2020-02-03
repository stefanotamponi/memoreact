export {
  acceptCookies,
  checkCookies,
  denyCookies
} from './gdpr';

export {
  createCategory,
  deleteCategory,
  editCategory,
  createTodo,
  updateTodoStatus,
  updateTodoContent,
  deleteTodo,
  pushData,
  clearData
} from './core';

export {
  auth,
  authCheckState,
  logout,
  deleteUser,
  resetPassword,
  clearInfo
} from './auth';

export  {
  startLoading,
  finishLoading,
  openModal,
  closeModal
} from './ui';