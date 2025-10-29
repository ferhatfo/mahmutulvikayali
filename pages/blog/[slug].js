// blog/[slug].js
import Image from 'next/image';
import Head from 'next/head';
import MultiPageHeader from '@/components/organisms/MultiPageHeader';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { getTranslation, getAvailableLocales } from '@/utils/i18nUtils';
import { getSlugsForLocale } from '@/utils/blogSlugMapping';

export async function getStaticPaths() {
  const locales = ['tr', 'en'];
  const paths = [];

  console.log('Generating static paths for blog locales:', locales);

  try {
    for (const locale of locales) {
      const slugs = getSlugsForLocale(locale);
      
      console.log(`Processing ${locale} with ${slugs.length} slugs:`, slugs);

      slugs.forEach((slug) => {
        paths.push({
          params: { slug },
          locale,
        });
        console.log(`✅ Added blog path: /${locale}/blog/${slug}`);
      });
    }

    console.log(`🎯 Total blog paths generated: ${paths.length}`);

  } catch (error) {
    console.error('💥 Error generating static paths:', error);
  }

  return { 
    paths, 
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params, locale }) {
  console.log('🔍 Generating props for blog slug:', params.slug, 'in locale:', locale);
  
  try {
    const translations = getTranslation(locale, 'blog');
    const blogs = translations.blogs || {};
    const blogArray = Object.values(blogs);
    
    console.log(`📝 Available blogs in ${locale}:`, blogArray.map(b => ({
      title: b.title,
      slug: b.slug
    })));
    
    const blog = blogArray.find((b) => b.slug === params.slug);

    if (!blog) {
      console.log('❌ Blog not found, returning 404 for slug:', params.slug);
      console.log('Available slugs:', blogArray.map(b => b.slug));
      
      return {
        notFound: true,
      };
    }

    console.log('✅ Found blog:', blog.title, 'with slug:', blog.slug);

    const serializedBlog = {
      title: blog.title,
      slug: blog.slug,
      description: blog.description,
      content: blog.content,
      image: blog.image,
      seo: blog.seo || null
    };

    const allBlogs = blogArray.map(blogItem => ({
      title: blogItem.title,
      slug: blogItem.slug,
      description: blogItem.description
    }));

    return {
      props: {
        blog: serializedBlog,
        allBlogs: allBlogs,
        ...(await serverSideTranslations(locale, ['common', 'navbar', 'blog', 'footer'])),
      },
      revalidate: 3600,
    };
    
  } catch (error) {
    console.error('❌ Error in getStaticProps:', error);
    return {
      notFound: true,
    };
  }
}

const createMarkup = (htmlContent) => {
  return { __html: htmlContent };
};

// Blog Sidebar Component
const BlogSidebar = ({ blogs, currentSlug }) => {
  const { t } = useTranslation('blog');

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
      <h3 className="text-xl font-bold mb-6 text-gray-900 border-b pb-3">
        {t('blogList.title')}
      </h3>
      <div className="space-y-4">
        {blogs.map((blogItem, index) => (
          <Link 
            key={index}
            href={`/blog/${blogItem.slug}`}
            className={`block p-4 rounded-lg border transition-all ${
              currentSlug === blogItem.slug 
                ? 'bg-blue-50 border-blue-200 shadow-sm' 
                : 'bg-gray-50 border-gray-200 hover:bg-white hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            <h4 className={`font-semibold mb-2 line-clamp-2 ${
              currentSlug === blogItem.slug ? 'text-blue-700' : 'text-gray-900'
            }`}>
              {blogItem.title}
            </h4>
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {blogItem.description}
            </p>
            <div className={`mt-2 text-sm font-medium ${
              currentSlug === blogItem.slug ? 'text-blue-600' : 'text-blue-500'
            }`}>
              {t('blogList.readMore')}
            </div>
          </Link>
        ))}
      </div>
      
      {/* Tüm Bloglar Linki */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <Link 
          href="/blog"
          className="flex items-center justify-center w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-center py-2 px-4 rounded-lg transition-colors font-medium text-sm"
        >
          <span>{t('blogList.viewAllPosts')}</span>
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default function BlogDetailPage({ blog, allBlogs }) {
  const { t } = useTranslation('blog');

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t('blogDetail.notFound')}</h1>
          <Link href="/blog" className="text-blue-600 hover:text-blue-800">
            {t('blogDetail.backToBlog')}
          </Link>
        </div>
      </div>
    );
  }

  const seoTitle = blog?.seo?.title || `${blog?.title} - Op. Dr. Mahmut Ulvi Kayalı`;
  const seoDescription = blog?.seo?.metaDescription || blog?.description;
  const seoKeywords = blog?.seo?.keywords?.join(', ') || '';

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        {seoKeywords && <meta name="keywords" content={seoKeywords} />}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="article" />
        {blog.image && <meta property="og:image" content={blog.image} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        {blog.image && <meta name="twitter:image" content={blog.image} />}
      </Head>

      <MultiPageHeader
        subtitle={t('header.subtitle')}
        title={t('header.title')}
        isImage={false}
      />

      <div className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Content */}
          <div className="w-full lg:w-3/4">
            {/* Breadcrumb Area */}
            <div className="bg-gray-100 border-gray-200 rounded-lg mb-6">
              <div className="container mx-auto px-4 md:px-6 py-4">
                <nav className="flex items-center space-x-2 text-sm text-gray-600 flex-wrap">
                  <Link href="/" className="hover:text-blue-600 transition-colors">
                    {t('breadcrumb.home')}
                  </Link>
                  <span className="text-gray-400">/</span>
                  <Link href="/blog" className="hover:text-blue-600 transition-colors">
                    {t('breadcrumb.blog')}
                  </Link>
                  <span className="text-gray-400">/</span>
                  <span className="text-gray-900 font-medium">
                    {blog.title}
                  </span>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              {/* Blog Header */}
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                  {blog.title}
                </h1>
                {blog.description && (
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {blog.description}
                  </p>
                )}
              </div>

              {/* Blog Image */}
              {blog.image && (
                <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Blog Content */}
              {blog.content && (
                <div className="prose max-w-none">
                  <div 
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={createMarkup(blog.content)}
                  />
                </div>
              )}
            </div>
          </div>
          {/* Sidebar - Güncellenmiş Tasarım */}
          <div className="w-full lg:w-1/4">
            <BlogSidebar 
              blogs={allBlogs.slice(0, 5)} 
              currentSlug={blog.slug}
            />
          </div>
        </div>
      </div>
    </>
  );
}