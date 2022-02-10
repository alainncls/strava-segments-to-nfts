import {createParamDecorator, ExecutionContext} from '@nestjs/common';

export const Segment = createParamDecorator((data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    if (!!req.segment) {
        return !!data ? req.segment[data] : req.segment;
    }

    return undefined;

});
