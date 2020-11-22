import { Test, TestingModule } from '@nestjs/testing';
import { CarServicingService } from './car-service.service';

describe('CarServiceService', () => {
  let service: CarServicingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarServicingService],
    }).compile();

    service = module.get<CarServicingService>(CarServicingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
