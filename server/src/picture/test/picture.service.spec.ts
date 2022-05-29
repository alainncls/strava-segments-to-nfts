import { Test, TestingModule } from '@nestjs/testing';
import { PictureService } from '../picture.service';
import { Canvas } from 'canvas';

describe('PictureService', () => {
  let service: PictureService;

  const stravaSegment = {
    _id: 'ID',
    stravaId: 123456,
    name: 'SEGMENT_NAME',
    distance: 1706.4,
    activity_type: 'Ride',
    map: {
      polyline:
        '}g|eFnpqjVl@En@Md@HbAd@d@^h@Xx@VbARjBDh@OPQf@w@d@k@XKXDFPH\\EbGT`AV`@v@|@NTNb@?XOb@cAxAWLuE@eAFMBoAv@eBt@q@b@}@tAeAt@i@dAC`AFZj@dB?~@[h@MbAVn@b@b@\\d@Eh@Qb@_@d@eB|@c@h@WfBK|AMpA?VF\\\\t@f@t@h@j@|@b@hCb@b@XTd@Bl@GtA?jAL`ALp@Tr@RXd@Rx@Pn@^Zh@Tx@Zf@`@FTCzDy@f@Yx@m@n@Op@VJr@',
    },
  };

  const mockCanvas = jest.fn();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PictureService],
    }).compile();

    service = module.get<PictureService>(PictureService);
    Canvas.prototype.toBuffer = mockCanvas;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a picture from a Strava segment', async () => {
    await service.generatePictureFromSegment(Promise.resolve(stravaSegment));
    expect(mockCanvas).toHaveBeenCalledTimes(1);
  });
});
