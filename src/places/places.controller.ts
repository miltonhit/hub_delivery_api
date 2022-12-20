import { Body, Controller, Query, Request, Delete, Get, Put, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { MenuSectionItemDto } from './dto/menu-section-item.dto';
import { MenuSectionDto } from './dto/menu-section.dto';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { PlacesService } from './places.service';

@UseGuards(JwtAuthGuard)
@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post()
  create(
    @Request() req,
    @Body() dto: CreatePlaceDto) {
    return this.placesService.create(req.user.id, dto);
  }

  @Get('byOwner?')
  list(@Request() req,
    @Query('complete') completeObj: boolean) {
    return this.placesService.listByOwner(req.user.id, completeObj);
  }

  @Get('byDistance')
  listByDistance(@Request() req, 
    @Query('lat') lat: number, 
    @Query('lng') lng: number,
    @Query('distance') distanceInMeters: number) {
    return this.placesService.listByDistance(lat, lng, distanceInMeters);
  }

  @Get(':id')
  getById(@Request() req, 
    @Param('id') id: string) {
    return this.placesService.getById(id);
  }

  @Post('sections')
  createSection(
    @Request() req,
    @Body() dto: MenuSectionDto) {
    
    dto.id = null;
    return this.placesService.saveMenuSection(req.user.id, dto);
  }

  @Put('sections/:sectionId')
  updateSection(
    @Request() req,
    @Param("sectionId") sectionId: string,
    @Body() dto: MenuSectionDto) {
    
    dto.id = sectionId;
    return this.placesService.saveMenuSection(req.user.id, dto);
  }

  @Post('sections/:sectionId/item/')
  createSectionItem(
    @Request() req,
    @Param("sectionId") sectionId: string,
    @Body() dto: MenuSectionItemDto) {
    
    dto.id = null;
    dto.sectionId = sectionId;
    
    return this.placesService.saveMenuItemSection(req.user.id, dto);
  }

  @Put('sections/:sectionId/item/:itemId')
  updateSectionItem(
    @Request() req,
    @Param("sectionId") sectionId: string,
    @Param("itemId") itemId: string,
    @Body() dto: MenuSectionItemDto) {

    dto.id = itemId;
    dto.sectionId = sectionId;

    return this.placesService.saveMenuItemSection(req.user.id, dto);
  }
}