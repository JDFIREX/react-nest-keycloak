import { Test, TestingModule } from '@nestjs/testing';
import { OwnService } from './own.service';

describe('OwnService', () => {
  let service: OwnService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OwnService],
    }).compile();

    service = module.get<OwnService>(OwnService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
