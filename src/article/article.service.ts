import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class ArticleService {
  private readonly logger = new Logger(ArticleService.name);

  async getWoowa() {
    const baseUrl = 'https://techblog.woowahan.com/?paged=';
    let page = 1;
    const data = [];

    while (true) {
      try {
        const html = await axios.get(`${baseUrl}${page}`, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          },
        });
        console.log(`${baseUrl}${page}`);
        const $ = cheerio.load(html.data);

        const bodylist = $('.post-item');
        bodylist.each((i, elem) => {
          const name = $(elem).find('a').find('h2').text();
          const link = $(elem).find('a').attr('href');
          if (name && link) {
            data.push({ name, link });
          }
        });
        if (bodylist.length === 2) {
          break;
        }
        page++;
      } catch (error) {
        console.log(error);
      }
    }
    console.log(data);
  }
}
