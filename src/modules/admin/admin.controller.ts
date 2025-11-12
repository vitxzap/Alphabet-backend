import { Controller, Post } from '@nestjs/common';
import { Roles } from '@thallesp/nestjs-better-auth';
import { AdminService } from './admin.service';

@Roles(['admin'])
@Controller('/admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  
}
