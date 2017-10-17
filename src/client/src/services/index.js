import AuthService from './AuthService';
import Repository from './Repository';


export const authService = new AuthService();

export const commentsService = new Repository('/api/comments');
