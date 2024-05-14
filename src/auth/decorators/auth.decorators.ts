import { UseGuards, applyDecorators } from "@nestjs/common";
import { Role } from "../../common/enum/rol.enum";
import { Roles } from "./roles.decorators";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles.guard";

export function Auth(role: Role){
    return applyDecorators(Roles(role),UseGuards(AuthGuard, RolesGuard),
    )
}