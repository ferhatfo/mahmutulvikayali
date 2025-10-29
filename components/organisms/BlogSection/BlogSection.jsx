// BlogSection.jsx
'use client';

import Image from 'next/image';
import Button from '@/components/atoms/Button';
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

export default function BlogSection({ isIndex }) {
  const { t, i18n } = useTranslation('blog');
  const currentLanguage = i18n.language;

  // Blog verilerini translation dosyasından al
  const blogs = Object.values(t('blogs', { returnObjects: true }) || {});

  // Geçerli blogları filtrele (başlığı ve slug'ı olanlar)
  const validBlogs = blogs.filter(blog => 
    blog && 
    blog.title && 
    typeof blog.title === 'string' && 
    blog.slug && 
    typeof blog.slug === 'string'
  );

  console.log('📖 Available blogs:', validBlogs.map(b => ({ title: b.title, slug: b.slug })));

  return (
    <section className="bg-white py-5 md:py-15 md:pb-20 pb-10">
      <div className="container mx-auto px-4">
        {isIndex && (
          <div className="text-center mb-8 md:mb-8">
            <h2 className="text-3xl font-bold text-[#151515] mb-4">
              {t('blogList.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm">
              {t('blogList.description')}
            </p>
          </div>
        )}

        {validBlogs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {validBlogs.slice(0, isIndex ? 6 : validBlogs.length).map((blog, index) => (
                <div key={index} className="overflow-hidden">
                  {blog.image && (
                    <div className="relative h-60">
                      <Image 
                        src={blog.image} 
                        alt={blog.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6 py-8 bg-gray-100 rounded-xl rounded-tl-none rounded-tr-none">
                    <h2 className="text-xl font-semibold text-[#151515] mb-3">{blog.title}</h2>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3">{blog.description}</p>
                    <Link href={`/blog/${blog.slug}`} locale={currentLanguage}>
                      <Button
                        text={t('blogList.readMore')}
                        backgroundColor="#ffffff"
                        textColor="#151515"
                        icon={<FaArrowRight size={14} />}
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            {isIndex && validBlogs.length > 6 && (
              <div className="grid place-items-center mt-12">
                <Link href="/blog" locale={currentLanguage}>
                  <Button
                    text={t('blogList.viewAllPosts')}
                    backgroundColor="#151515"
                    textColor="#fff"
                    icon={<FaArrowRight size={14} />}
                  />
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">{t('blogList.noBlogs')}</p>
          </div>
        )}
      </div>
    </section>
  );
}