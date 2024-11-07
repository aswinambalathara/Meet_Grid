export class ApplicationError extends Error{
    constructor(message:string){
        super(message);
        this.name = "Application Error"
    }
}

export class NotFoundError extends ApplicationError {
    constructor(message = "Resource not found") {
        super(message);
        this.name = "NotFoundError";
    }
}

export class ValidationError extends ApplicationError {
    constructor(message = "Validation failed") {
        super(message);
        this.name = "ValidationError";
    }
}

export class ConflictError extends ApplicationError {
    constructor(message = "Resource Already Exist") {
        super(message);
        this.name = "Conflict Error";
    }
}

export class ForbiddenError extends ApplicationError {
    constructor(message: string = "Access denied") {
        super(message);
        this.name = "ForbiddenError";
    }
}

export class UnauthorizedError extends ApplicationError {
    constructor(message: string = "Unauthorized access") {
        super(message);
        this.name = "UnauthorizedError";
    }
}

export class InternalServerError extends ApplicationError {
    constructor(message: string = "Internal server error") {
        super(message);
        this.name = "InternalServerError";
    }
}