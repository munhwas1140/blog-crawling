import { Controller, Get, Param } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async getAllArticles() {
    await this.articleService.getWoowa();
    return 'all article json';
  }

  @Get(':id')
  getArticleDetail(@Param('id') id: any) {
    return `${id} article.`;
  }
}
